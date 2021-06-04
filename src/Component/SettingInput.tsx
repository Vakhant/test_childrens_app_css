import React from "react";
import {ExampleSettings} from "../Example/ExampleSettings";

interface Props {
    exampleSettings: ExampleSettings
    name: keyof ExampleSettings
    disabled: boolean
}

interface State {
    value: string
}

export class SettingInput extends React.Component<Props> {
    public readonly state: State = {
        value: this.props.exampleSettings[this.props.name].toString(),
    }

   public render() {
        return (
            <input
                className='input_text'
                type="number"
                value={this.state.value}
                onChange={this.changeHandler.bind(this)}
                disabled={this.props.disabled}/>
        )
    }

    private changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        const exampleSettings = this.props.exampleSettings
        const value = event.target.value
        exampleSettings[this.props.name] = +value
        this.setState({
            value: value
        })
    }
}
