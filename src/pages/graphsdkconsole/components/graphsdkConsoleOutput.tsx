import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { clearConsoleOutput } from '../../../store/graphsdkconsole/actions'
import ConsoleOutput, { IConsoleEntry } from '../../../components/consoleOutput/ConsoleOutput'

interface IGraphSDKConsoleOutputProps {
  height: number
}

const GraphSDKConsoleOutput: React.FC<IGraphSDKConsoleOutputProps> = ({ height }) => {
  const dispatch = useDispatch()
  const entries = useSelector((state: IRootState) => state.graphsdkconsole.consoleOutput)

  return (
    <ConsoleOutput
      entries={entries as IConsoleEntry[]}
      onClear={() => dispatch(clearConsoleOutput())}
      height={height}
      pageContext="graphsdkconsole"
    />
  )
}

export default GraphSDKConsoleOutput
