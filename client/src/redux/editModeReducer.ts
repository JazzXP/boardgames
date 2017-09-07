import { 
    SetEditMode
} from './action_types'

type AllEditActions = SetEditMode;

export default function editModeReducer(state: boolean = false, action: AllEditActions): boolean {
    return (action && action.editMode !== undefined) ? action.editMode : state;
}
