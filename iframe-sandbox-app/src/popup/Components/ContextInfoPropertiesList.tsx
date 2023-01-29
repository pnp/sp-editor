import { Checkbox, IconButton, IScrollablePaneStyles, ITextFieldStyles, Label, List, ScrollablePane, ScrollbarVisibility, Stack, TextField, Toggle, TooltipHost } from '@fluentui/react';
import { useState } from 'react';

export interface ContextInfoPropertiesProps {
    properties: ICtxInfoProperty[]
}

export interface ICtxInfoProperty {
    property: string,
    value: string
}

const colorTextInputStyles: Partial<ITextFieldStyles> = {
    root: {
        marginLeft: 10,
        marginRight: 10,
    },
};

const scrollablePaneStyles: IScrollablePaneStyles = {
    root: {
        marginTop: 135
    },
    stickyAbove: undefined,
    stickyBelow: undefined,
    stickyBelowItems: undefined,
    contentContainer: undefined
}

const ContextInfoPropertiesList = ({ properties }: ContextInfoPropertiesProps) => {
    const [filterText, setFilterText] = useState<string>('');
    const [filterByValue, setFilterByValue] = useState<boolean>(false);
    

    const ListItem = ({ property, value }: ICtxInfoProperty) =>
        <TextField
            style={{ color: 'black' }}
            disabled
            defaultValue={value}
            multiline={value.length > 50}
            onRenderLabel={() => <Label>{property}</Label>}
            onRenderSuffix={() =>
                <TooltipHost content="Copy property value">
                    <IconButton
                        iconProps={{ iconName: 'Copy' }}
                        onClick={() => navigator.clipboard.writeText(value)} />
                </TooltipHost>}
        />

    return (
        <>
            <TextField styles={colorTextInputStyles}
                label={"ContextInfo properties: " + properties.filter(p => p.property.toLowerCase().includes(filterText.toLowerCase())).length}
                placeholder="Filter properties..."
                onChange={(e, newValue) => setFilterText(newValue || '')}
            />
            <Checkbox styles={{ root: { marginLeft: 10, marginTop: 5 } }}
                label="Filter by value"
                onChange={(e, checked) => setFilterByValue(checked || false)}
            />

            <ScrollablePane styles={scrollablePaneStyles}>

                <List style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
                    items={properties.filter(function (t) {
                        return !filterByValue ? ~t.property.toLowerCase().indexOf(filterText.toLowerCase()):
                        ~t.value.toLowerCase().indexOf(filterText.toLowerCase());
                    })}
                    onRenderCell={
                        (item?: ICtxInfoProperty) => item && <ListItem property={item.property} value={item.value} />
                    } />
            </ScrollablePane>
        </>)

}

export default ContextInfoPropertiesList
