import { 
    SetEditMode
} from './action_types'
import { EditModeState } from './editModeState';
import { SET_EDIT_MODE } from './constants';

type AllEditActions = SetEditMode;

export default function editModeReducer(state: boolean = false, action: AllEditActions): boolean {
    return (action && action.editMode !== undefined) ? action.editMode : state;
}
