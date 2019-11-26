import * as styles from '../styles/DisplayField.scss';
import * as React from 'react';
import { GeneralDisplayFieldProps, GeneralDisplayFieldState, GeneralDisplayField } from './GeneralDisplayField';

interface DisplayFieldProps extends GeneralDisplayFieldProps {
    fieldVal?: string
}

export class DisplayField extends GeneralDisplayField<DisplayFieldProps, GeneralDisplayFieldState> {
    render() {
        if (!this.props.fieldVal && !this.props.editMode)
            return null;
        return <span className={styles.displayField + ((this.state &&  this.state.error) ? ' ' + styles.error : '')}><span>{this.props.label}</span>{ !this.props.editMode ? <span>{this.props.fieldVal}</span> : <span><input type="text" defaultValue={this.props.fieldVal} onBlur={this.blurCall.bind(this)} /></span>}{(this.state && this.state.error)?<span>{this.state.error}</span>:''}</span>;
    }
}