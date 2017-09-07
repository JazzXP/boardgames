import * as React from 'react';

export interface GeneralDisplayFieldProps {
    label?: string,
    editMode: boolean,
    onBlur?: (e: React.SyntheticEvent<HTMLFormElement>) => void,
    validator?: (input: string) => true | string
}

export interface GeneralDisplayFieldState {
    error?: string
}

export abstract class GeneralDisplayField<P extends GeneralDisplayFieldProps, S extends GeneralDisplayFieldState> extends React.PureComponent<P, S> {
    componentWillReceiveProps(nextProps: P) {
        if (nextProps.editMode !== this.props.editMode && !nextProps.editMode) {
            this.setState({error: undefined});
        }
    }

    blurCall(e: React.SyntheticEvent<HTMLFormElement>) {
        if (this.props.validator) {
            let error = this.props.validator(e.currentTarget.value);
            if (error !== true) {
                this.setState({error: (error as any) as string});
                return;
            }
            this.setState({error: undefined});
        }
        this.props.onBlur && this.props.onBlur(e);
    }
}