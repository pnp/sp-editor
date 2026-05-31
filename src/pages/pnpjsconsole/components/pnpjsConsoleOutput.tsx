import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { clearConsoleOutput } from '../../../store/pnpjsconsole/actions'
import ConsoleOutput, { IConsoleEntry } from '../../../components/consoleOutput/ConsoleOutput'

interface IPnPjsConsoleOutputProps {
  height: number
}

const PnPjsConsoleOutput: React.FC<IPnPjsConsoleOutputProps> = ({ height }) => {
  const dispatch = useDispatch()
  const entries = useSelector((state: IRootState) => state.pnpjsconsole.consoleOutput)

  return (
    <ConsoleOutput
      entries={entries as IConsoleEntry[]}
      onClear={() => dispatch(clearConsoleOutput())}
      height={height}
      pageContext="pnpjsconsole"
    />
  )
}

export default PnPjsConsoleOutput

