export interface IPermission {
  id: number
  permission_type: string
  reqt_id: number
  sta_id: number
  user_type: string
  username: string
}

const Permission = (props: IPermission) => null

export default Permission
