import * as styles from '../styles/DisplayURLField.scss';
import * as React from 'react';
import { GeneralDisplayFieldProps, GeneralDisplayFieldState, GeneralDisplayField } from './GeneralDisplayField';

export interface DisplayURLFieldProps extends GeneralDisplayFieldProps {
    url?: string
}

export class DisplayURLField extends GeneralDisplayField<DisplayURLFieldProps, GeneralDisplayFieldState> {
    render() {
        if (!this.props.url && !this.props.editMode)
            return null;
        return <span className={styles.displayURLField + ((this.state &&  this.state.error) ? ' ' + styles.error : '')}><span>{this.props.label}</span>{ !this.props.editMode ? <a href={this.props.url}>{this.props.url}</a> : <span><input type="text" defaultValue={this.props.url ? this.props.url : ""} onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : ""} /></span>}</span>;
    }
}