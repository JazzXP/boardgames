import * as styles from '../styles/DisplayURLField.scss';
import * as React from 'react';

export interface DisplayURLFieldProps {
    label: string,
    url?: string,
    editMode: boolean;
    onBlur?: Function;
}

export class DisplayURLField extends React.PureComponent<DisplayURLFieldProps, {}> {
    render() {
        if (!this.props.url && !this.props.editMode)
            return null;
        return <span className={styles.displayURLField}><span>{this.props.label}</span>{ !this.props.editMode ? <a href={this.props.url}>{this.props.url}</a> : <span><input type="text" defaultValue={this.props.url ? this.props.url : ""} onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : ""} /></span>}</span>;
    }
}