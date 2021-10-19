import { NodeModel } from '@minoru/react-dnd-treeview'
import React from 'react'
import { CustomData } from './types'

type Props = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel<CustomData>['id']) => void;
  onSelect: (node: NodeModel<CustomData>) => void;
}

export const CustomNode: React.FC<Props> = (props) => {
  const { droppable, data } = props.node
  const indent = props.depth * 24

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onToggle(props.node.id)
  }

  return (
    <div style={{ paddingInlineStart: indent }}>
      <div>
        <div onClick={handleToggle}>{props.isOpen ? '-' : '+'}</div>
      </div>
      <div></div>
      <div>{props.node.text}</div>
    </div>
  )
}
