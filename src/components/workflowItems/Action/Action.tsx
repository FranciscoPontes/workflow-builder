import React from 'react'

enum EUserAction {
  yes = 'Y',
  no = 'N',
}
export interface IAction {
  action_type: string
  code: string
  id: number
  label: number
  sta_id: number
  user_action_yn: EUserAction
  sort_order: number
}

interface IActionProps {
  props: IAction
}

const Action = ({ props }: IActionProps) => {
  return (
    <div>
      <span>{props.label}</span>
      <span>{props.action_type}</span>
    </div>
  )
}

export default Action
