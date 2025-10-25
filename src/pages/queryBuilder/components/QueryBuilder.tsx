import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../store';
import { ComboBox, Dropdown, PrimaryButton, TextField, Text, DefaultButton, IDropdownOption } from '@fluentui/react';
import { ODataQueryBuilder } from 'mgwdev-m365-helpers/lib/utils/queryBuilders/ODataQueryBuilder';
import { CamlQueryBuilder } from 'mgwdev-m365-helpers/lib/utils/queryBuilders/CamlQueryBuilder';
import * as actions from '../../../store/queryBuilder/actions';
import { runRestCall } from '../../spshooter/chrome/chrome-actions';
import { setBody, setMethod, setPath } from '../../../store/spshoot/actions';
import { useNavigate } from 'react-router';
import { IQueryField, LogicalOperator } from '../../../store/queryBuilder/types';

export type ODataComparer =
  | 'BeginsWith'
  | 'Contains'
  | 'DateRangesOverlap'
  | 'Eq'
  | 'IDEq'
  | 'Geq'
  | 'Gt'
  | 'Includes'
  | 'IsNotNull'
  | 'IsNull'
  | 'Leq'
  | 'Lt'
  | 'Neq'
  | 'NotIncludes'
  | 'Values'
  | 'CurrentUserGroups';

const oDatacomparers: ODataComparer[] = [
  'BeginsWith',
  'Contains',
  'DateRangesOverlap',
  'Eq',
  'IDEq',
  'Geq',
  'Gt',
  'Includes',
  'IsNotNull',
  'IsNull',
  'Leq',
  'Lt',
  'Neq',
  'NotIncludes',
  'Values',
  'CurrentUserGroups',
];

export default function SPQueryBuilder() {
  const { listFields, configuredQueryFields, selectedListId, context, query, camlQuery, selectedViewFields } =
    useSelector((state: IRootState) => state.queryBuilder);
  const { isDark } = useSelector((state: IRootState) => state.home);

  const [newFilterVisible, setNewFilterVisible] = useState(true);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [previousListId, setPreviousListId] = useState(selectedListId);

  const isListSelected = !!selectedListId;

  useEffect(() => {
    if (selectedListId && selectedListId !== previousListId) {
      dispatch(actions.setConfiguredQueryFields([]));
      dispatch(actions.setCamlQuery(''));
      dispatch(actions.setQuery(''));
      dispatch(actions.setSelectedViewFields([]));
      setNewFilterVisible(true);
      setPreviousListId(selectedListId);
    }
  }, [selectedListId, previousListId, dispatch]);

  // Convert list fields to dropdown options
  const fieldOptions: IDropdownOption[] = React.useMemo(
    () =>
      listFields.map((f) => ({
        key: f.InternalName,
        text: f.InternalName,
      })),
    [listFields]
  );
  // Build queries with AND/OR support
  const buildQuery = React.useCallback(() => {
    try {
      const validFields = configuredQueryFields.filter(
        (queryFld) => queryFld.comparer && queryFld.name && queryFld.value && queryFld.type
      );

      if (validFields.length === 0) {
        dispatch(actions.setQuery(''));
        dispatch(actions.setCamlQuery(''));
        return;
      }

      let oDataResult = '';
      let camlResult = '';

      try {
        // For OData, build the query string manually
        const oDataParts: string[] = [];

        validFields.forEach((queryFld) => {
          const builder = new ODataQueryBuilder();
          builder.withFieldQuery({
            name: queryFld.name,
            value: queryFld.value,
            type: queryFld.type,
            comparer: queryFld.comparer,
          });

          const part = builder.build();
          oDataParts.push(part);
        });

        // Combine parts with AND/OR operators
        oDataResult = oDataParts.reduce((acc, part, index) => {
          if (index === 0) return part;
          const operator = validFields[index].operator === 'Or' ? ' or ' : ' and ';
          return `(${acc})${operator}(${part})`;
        }, '');

        // Add $select if fields are selected
        if (selectedViewFields && selectedViewFields.length > 0) {
          oDataResult += `&$select=${selectedViewFields.join(',')}`;
        }
      } catch (err) {
        console.error('Error building OData query:', err);
      }

      try {
        // Build CAML manually with proper nesting
        const camlParts: string[] = [];

        validFields.forEach((queryFld) => {
          const builder = new CamlQueryBuilder();
          builder.withFieldQuery({
            name: queryFld.name,
            value: queryFld.value,
            type: queryFld.type,
            comparer: queryFld.comparer,
          });
          camlParts.push(builder.build());
        });

        // Combine CAML parts with proper operator precedence
        if (camlParts.length === 1) {
          camlResult = camlParts[0];
        } else {
          // Build from right to left to get proper nesting
          camlResult = camlParts.reduceRight((acc, part, index) => {
            if (index === camlParts.length - 1) return part;
            const operator = validFields[index + 1].operator === 'Or' ? 'Or' : 'And';
            return `<${operator}>${part}${acc}</${operator}>`;
          }, '');
        }
      } catch (err) {
        console.error('Error building CAML query:', err);
      }

      dispatch(actions.setQuery(oDataResult));
      dispatch(actions.setCamlQuery(camlResult));
    } catch (error) {
      console.error('Error building query:', error);
    }
  }, [configuredQueryFields, selectedViewFields, dispatch]);

  useEffect(() => {
    buildQuery();
  }, [buildQuery]);

  const formattedCaml = React.useMemo(() => prettyPrintXmlString(camlQuery), [camlQuery]);
  const camlRows = React.useMemo(() => Math.max(6, formattedCaml.split('\n').length), [formattedCaml]);

  const path = `_api/web/lists/getById(guid'${selectedListId}')/RenderListDataAsStream`;

  // Build ViewFields XML
  const viewFieldsXml =
    selectedViewFields && selectedViewFields.length > 0
      ? `<ViewFields>${selectedViewFields.map((f) => `<FieldRef Name='${f}' />`).join('')}</ViewFields>`
      : '';

  const fullCaml = prettyPrintXmlString(
    `<View Scope="RecursiveAll"><Query><Where>${camlQuery}</Where></Query>${viewFieldsXml}</View>`
  ).replace(/\\n/g, '\n');

  const body = JSON.stringify(
    {
      parameters: {
        RenderOptions: 2,
        ViewXml: fullCaml,
      },
    },
    null,
    2
  ).replace(/\\n/g, '\n');

  // Check OData query length and validity
  const oDataQueryInfo = React.useMemo(() => {
    if (!selectedListId) {
      return { isValid: false, length: 0, errorMessage: '' };
    }

    let fullQuery = `${
      context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''
    }/_api/web/lists/getById(guid'${selectedListId}')/items`;
    const queryParams: string[] = [];

    if (query) {
      queryParams.push(`$filter=${query}`);
    }

    if (selectedViewFields && selectedViewFields.length > 0) {
      const expandFields: string[] = [];

      selectedViewFields.forEach((field) => {
        const fieldDef = listFields.find((f) => f.InternalName === field);
        if (
          fieldDef &&
          (fieldDef.TypeAsString === 'User' ||
            fieldDef.TypeAsString === 'UserMulti' ||
            fieldDef.TypeAsString === 'Lookup' ||
            fieldDef.TypeAsString === 'LookupMulti')
        ) {
          expandFields.push(field);
        }
      });

      queryParams.push(`$select=${selectedViewFields.join(',')}`);

      if (expandFields.length > 0) {
        queryParams.push(`$expand=${expandFields.join(',')}`);
      }
    }

    if (queryParams.length > 0) {
      fullQuery += `?${queryParams.join('&')}`;
    }

    const queryLength = fullQuery.length;
    const maxLength = 2048; // SharePoint URL length limit

    return {
      isValid: queryLength <= maxLength,
      length: queryLength,
      errorMessage:
        queryLength > maxLength
          ? `Query URL is too long (${queryLength} characters, max ${maxLength}). Please select fewer fields or use CAML query instead.`
          : '',
    };
  }, [selectedListId, context, query, selectedViewFields, listFields]);

  // Update the displayODataQuery to automatically detect lookup fields
  const displayODataQuery = React.useMemo(() => {
    const queryParams: string[] = [];

    if (query) {
      queryParams.push(`$filter=${query}`);
    }

    if (selectedViewFields && selectedViewFields.length > 0) {
      const expandFields: string[] = [];

      selectedViewFields.forEach((field) => {
        const fieldDef = listFields.find((f) => f.InternalName === field);
        if (
          fieldDef &&
          (fieldDef.TypeAsString === 'User' ||
            fieldDef.TypeAsString === 'UserMulti' ||
            fieldDef.TypeAsString === 'Lookup' ||
            fieldDef.TypeAsString === 'LookupMulti')
        ) {
          expandFields.push(field);
        }
      });

      queryParams.push(`$select=${selectedViewFields.join(',')}`);

      if (expandFields.length > 0) {
        queryParams.push(`$expand=${expandFields.join(',')}`);
      }
    }

    return queryParams.length > 0 ? `/items?${queryParams.join('&')}` : '/items';
  }, [query, selectedViewFields, listFields]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginTop: '5px',
      }}
    >
      <Text style={{ fontWeight: 600 }}>Query</Text>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        {configuredQueryFields.map((fld, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0' }}>
                <Dropdown
                  selectedKey={fld.operator || 'And'}
                  options={[
                    { key: 'And', text: 'AND' },
                    { key: 'Or', text: 'OR' },
                  ]}
                  styles={{ root: { width: '100px' } }}
                  disabled={!isListSelected}
                  onChange={(e, option) => {
                    const temp = [...configuredQueryFields];
                    temp[index] = {
                      ...temp[index],
                      operator: option?.key as LogicalOperator,
                    };
                    dispatch(actions.setConfiguredQueryFields(temp));
                  }}
                />
              </div>
            )}
            <FieldQueryBuilder index={index} />
          </React.Fragment>
        ))}
        {newFilterVisible && <FieldQueryBuilder index={configuredQueryFields.length} key="new-row" />}
      </div>
      {/* Field selector for ViewFields */}
      {/* Field selector for ViewFields with Select/Deselect All buttons */}
      <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', marginBottom: '10px' }}>
        <Dropdown
          placeholder="Select fields to return (leave empty for all fields)"
          label="View Fields"
          multiSelect
          selectedKeys={selectedViewFields}
          options={fieldOptions}
          disabled={!isListSelected}
          onChange={(e, option) => {
            if (option) {
              // Handle individual field selection
              const newSelectedFields = option.selected
                ? [...(selectedViewFields || []), option.key as string]
                : (selectedViewFields || []).filter((key) => key !== option.key);
              dispatch(actions.setSelectedViewFields(newSelectedFields));
            }
          }}
          styles={{
            root: { maxWidth: '400px', flexGrow: 1 },
            dropdownItemsWrapper: isDark
              ? {
                  backgroundColor: '#2d2d2d',
                }
              : {},
            dropdownItem: isDark
              ? {
                  color: '#ffffff',
                  selectors: {
                    ':hover': {
                      backgroundColor: '#404040',
                      color: '#ffffff',
                    },
                  },
                }
              : {},
            dropdownItemSelected: isDark
              ? {
                  backgroundColor: '#404040',
                  color: '#ffffff',
                }
              : {},
          }}
        />
        <DefaultButton
          text="Select All"
          onClick={() => {
            const allFields = listFields.map((f) => f.InternalName);
            dispatch(actions.setSelectedViewFields(allFields));
          }}
          style={{ height: 'min-content' }}
          disabled={!isListSelected}
        />
        <DefaultButton
          text="Clear All"
          onClick={() => {
            dispatch(actions.setSelectedViewFields([]));
          }}
          style={{ height: 'min-content' }}
          disabled={!isListSelected}
        />
      </div>
      <div>
        {/* CAML Query section */}
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'flex-end',
            maxWidth: '100%',
          }}
        >
          <TextField
            styles={{
              root: { width: '100%', maxWidth: 'calc(100vw - 400px)' },
              field: { maxHeight: '400px', overflowY: 'auto' },
            }}
            multiline
            label={'Caml Query'}
            value={fullCaml}
            readOnly
            rows={camlRows}
            disabled={!isListSelected}
          />
          <PrimaryButton
            style={{
              height: 'min-content',
              minWidth: '170px',
            }}
            text="Test CAML Query"
            disabled={!isListSelected}
            onClick={() => {
              dispatch(setPath(path));
              dispatch(setBody(body));
              dispatch(setMethod('POST'));
              const fullPath: string = `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/${path}`;
              runRestCall(dispatch, {
                path: fullPath,
                method: 'POST',
                headers: JSON.stringify({
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                }),
                body: body,
              });
              navigate('/spshooter', { state: { from: 'queryBuilder', queryType: 'caml' } });
            }}
          />
        </div>

        {/* OData Query section with error message */}
        <div style={{ marginTop: '10px', maxWidth: '100%' }}>
          {oDataQueryInfo.isValid && oDataQueryInfo.length > 1500 && (
            <Text
              style={{
                color: '#ca5010',
                fontSize: '12px',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              ⚡ Warning: Query URL is getting long ({oDataQueryInfo.length} characters). Consider using fewer fields.
            </Text>
          )}
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1, maxWidth: 'calc(100vw - 400px)' }}>
              <TextField
                disabled={!isListSelected}
                styles={{ root: { width: '100%' } }}
                label={'OData query'}
                value={displayODataQuery}
                readOnly
              />
              {!oDataQueryInfo.isValid && oDataQueryInfo.errorMessage && (
                <Text
                  style={{
                    color: '#a4262c',
                    fontSize: '12px',
                    marginTop: '5px',
                    display: 'block',
                  }}
                >
                  {oDataQueryInfo.errorMessage}
                </Text>
              )}
            </div>
            <PrimaryButton
              style={{
                height: 'min-content',
                minWidth: '170px',
                marginTop: '28px', // Align with the TextField input (accounting for label)
              }}
              disabled={!isListSelected || !oDataQueryInfo.isValid}
              text="Test OData Query"
              onClick={() => {
                // Build the complete OData query path with $filter and $select
                let oDataPath = `_api/web/lists/getById(guid'${selectedListId}')/items`;

                const queryParams: string[] = [];

                // Add filter if query exists
                if (query) {
                  queryParams.push(`$filter=${query}`);
                }

                // Add select and expand if fields are selected
                if (selectedViewFields && selectedViewFields.length > 0) {
                  const expandFields: string[] = [];

                  selectedViewFields.forEach((field) => {
                    const fieldDef = listFields.find((f) => f.InternalName === field);
                    // Check if field is a lookup type that needs expansion
                    if (
                      fieldDef &&
                      (fieldDef.TypeAsString === 'User' ||
                        fieldDef.TypeAsString === 'UserMulti' ||
                        fieldDef.TypeAsString === 'Lookup' ||
                        fieldDef.TypeAsString === 'LookupMulti')
                    ) {
                      expandFields.push(field);
                    }
                  });

                  queryParams.push(`$select=${selectedViewFields.join(',')}`);

                  if (expandFields.length > 0) {
                    queryParams.push(`$expand=${expandFields.join(',')}`);
                  }
                }

                // Combine all query parameters
                if (queryParams.length > 0) {
                  oDataPath += `?${queryParams.join('&')}`;
                }

                dispatch(setPath(oDataPath));
                const fullPath: string = `${
                  context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''
                }/${oDataPath}`;
                dispatch(setMethod('GET'));
                dispatch(setBody(''));
                runRestCall(dispatch, {
                  path: fullPath,
                  method: 'GET',
                  headers: JSON.stringify({
                    accept: 'application/json',
                  }),
                  body: '',
                });
                navigate('/spshooter', { state: { from: 'queryBuilder', queryType: 'odata' } });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function prettyPrintXmlString(xmlString: string) {
  if (!xmlString || xmlString.trim() === '') {
    return '';
  }

  const cleaned = xmlString.replace(/\\r\\n/g, '').replace(/>\s+</g, '><');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(cleaned, 'application/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    console.error('XML Parse Error:', parserError.textContent);
    return xmlString;
  }

  const serializer = new XMLSerializer();
  let formatted = serializer.serializeToString(xmlDoc);

  formatted = formatted.replace(/(>)(<)(\/*)/g, '$1\n$2$3');
  let pad = 0;
  const result = formatted
    .split('\n')
    .map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
        indent = 1;
      }
      const line = '  '.repeat(pad) + node;
      pad += indent;
      return line;
    })
    .join('\n');

  return result;
}

function FieldQueryBuilder(props: { index: number }) {
  const { listFields, configuredQueryFields, selectedListId } = useSelector((state: IRootState) => state.queryBuilder);
  const dispatch = useDispatch();

  const isListSelected = !!selectedListId;
  const isNewRow = props.index === configuredQueryFields.length;
  const reduxField = configuredQueryFields[props.index];

  const [newRowField, setNewRowField] = useState<{
    name: string;
    comparer: ODataComparer | '';
    value: string;
  }>({
    name: '',
    comparer: '',
    value: '',
  });

  const currentField = isNewRow
    ? newRowField
    : {
        name: reduxField?.name || '',
        comparer: reduxField?.comparer || '',
        value: reduxField?.value || '',
      };

  const handleFieldChange = (field: string) => {
    if (isNewRow) {
      setNewRowField({ ...newRowField, name: field });
    } else {
      const temp = [...configuredQueryFields];
      temp[props.index] = {
        ...temp[props.index],
        name: field,
        type: listFields.find((fld) => fld.InternalName === field)?.TypeAsString || temp[props.index].type,
      } as IQueryField;
      dispatch(actions.setConfiguredQueryFields(temp));
    }
  };

  const handleComparerChange = (comparer: ODataComparer) => {
    if (isNewRow) {
      setNewRowField({ ...newRowField, comparer });
    } else {
      const temp = [...configuredQueryFields];
      temp[props.index] = {
        ...temp[props.index],
        comparer,
      } as IQueryField;
      dispatch(actions.setConfiguredQueryFields(temp));
    }
  };

  const handleValueChange = (value: string) => {
    if (isNewRow) {
      setNewRowField({ ...newRowField, value });
    } else {
      const temp = [...configuredQueryFields];
      temp[props.index] = {
        ...temp[props.index],
        value,
      } as IQueryField;
      dispatch(actions.setConfiguredQueryFields(temp));
    }
  };

  const handleAddOrUpdate = () => {
    const { name, comparer, value } = currentField;
    if (!name || !comparer || !value) return;

    const fieldType = listFields.find((fld) => fld.InternalName === name)?.TypeAsString || '';

    if (!fieldType) {
      console.error('Could not find field type for:', name);
      return;
    }

    const newField: IQueryField = {
      name,
      value,
      type: fieldType,
      comparer: comparer as ODataComparer,
    };

    if (isNewRow) {
      dispatch(actions.setConfiguredQueryFields([...configuredQueryFields, newField]));
      setNewRowField({ name: '', comparer: '', value: '' });
    } else {
      const temp = [...configuredQueryFields];
      temp[props.index] = newField;
      dispatch(actions.setConfiguredQueryFields(temp));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      <ComboBox
        selectedKey={currentField.name}
        style={{ width: '200px' }}
        disabled={!isListSelected}
        options={listFields.map((o) => ({
          key: o.InternalName,
          text: o.InternalName,
        }))}
        onChange={(e, option) => {
          handleFieldChange(option?.key?.toString() || '');
        }}
      />
      <Dropdown
        selectedKey={currentField.comparer}
        style={{ width: '100px' }}
        disabled={!isListSelected}
        options={oDatacomparers.map((c) => ({
          key: c,
          text: c,
        }))}
        onChange={(e, option) => {
          handleComparerChange((option?.key as ODataComparer) || '');
        }}
      />
      <TextField
        value={currentField.value}
        disabled={!isListSelected}
        onChange={(e, data) => {
          handleValueChange(data || '');
        }}
      />
      <PrimaryButton
        text={isNewRow ? 'Add' : 'Update'}
        disabled={!isListSelected || !currentField.name || !currentField.comparer || !currentField.value}
        onClick={handleAddOrUpdate}
        style={{ minWidth: '100px' }}
      />
      {!isNewRow && (
        <DefaultButton
          text="Remove"
          disabled={!isListSelected}
          style={{ minWidth: '100px' }}
          onClick={() => {
            const temp = [...configuredQueryFields];
            temp.splice(props.index, 1);
            dispatch(actions.setConfiguredQueryFields(temp));
          }}
        />
      )}
    </div>
  );
}
