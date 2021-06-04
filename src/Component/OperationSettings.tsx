import React from "react";
import {SettingInput} from "./SettingInput";
import {ExampleSettings} from "../Example/ExampleSettings";
import {Operation} from "../Example/Operation";
import {TaskSettings} from "../Task/TaskSettings";
import {Profile} from "../Example/Profile";
import {copyValues, isEqual} from "../ObjectManipulator";
import css from './OperationSettings.module.css';

interface Props {
    baseOperation: Operation.Add | Operation.Mult
    taskSettings: TaskSettings
    exampleSettings: ExampleSettings
    profiles: Profile[]
}

interface State {
    isSettingsOpened: boolean
    taskSettings: TaskSettings
    exampleSettings: ExampleSettings
}

export class OperationSettings extends React.Component<Props, State> {
    public readonly state: State = {
        isSettingsOpened: false,
        taskSettings: this.props.taskSettings,
        exampleSettings: this.props.exampleSettings,
    }

    public render() {
        const operationCheckboxes = this.operations.map(this.renderOperationCheckbox.bind(this))

        return (
            <div className={css.settings_container}>
                    <div className={css.operation_checkboxes_list}>
                        {operationCheckboxes}
                    </div>
                    <form>
                        {this.props.profiles.map(this.renderProfile.bind(this))}
                    </form>
                    <div className={`${css.settings} ${!this.state.isSettingsOpened ? "" : css.settings_opened}`}>
                        <button className={css.settings_btn} onClick={(): void => this.setState({isSettingsOpened: !this.state.isSettingsOpened})}>
                            Детальные настройки
                            <svg className={css.settings_arrow} xmlns="http://www.w3.org/2000/svg" width="17.762" height="10.295" viewBox="0 0 17.762 10.295">
                                <g id="Сгруппировать_8" data-name="Сгруппировать 8" transform="translate(-497.153 -854.352)">
                                    <line id="Линия_19" data-name="Линия 19" x2="7.467" y2="7.467" transform="translate(513.5 863.233) rotate(180)" fill="none" stroke={!this.state.isSettingsOpened ? '#fff' : '#758eb1'} strokeLinecap="round" strokeWidth="2"/>
                                    <line id="Линия_20" data-name="Линия 20" x1="7.467" y2="7.467" transform="translate(506.034 863.233) rotate(180)" fill="none" stroke={!this.state.isSettingsOpened ? '#fff' : '#758eb1'} strokeLinecap="round" strokeWidth="2"/>
                                </g>
                            </svg>
                        </button>
                    {this.renderSettings(this.state.exampleSettings)}
                    </div>
            </div>
        )
    }

    private get operations(): Operation[] {
        const baseOperation = this.props.baseOperation

        return [baseOperation, baseOperation + 1]
    }

    private renderProfile(profile: Profile) {
        const isInputDisabled = this.isInputDisabled

        return (
            <label className={css.input_radio_wrap} key={profile.name}>
                <input
                    type="radio"
                    name='profile'
                    checked={!isInputDisabled && isEqual(this.state.exampleSettings, profile.exampleSettings)}
                    disabled={isInputDisabled}
                    onChange={this.changeRadioHandler.bind(this, profile)}/>
                {profile.name}
            </label>
        )
    }

    private get isInputDisabled(): boolean {
        return !this.props
            .taskSettings
            .operations
            .some((operation: Operation): boolean => this.operations.includes(operation))
    }

    private changeRadioHandler(profile: Profile): void {
        const exampleSettings = this.state.exampleSettings
        copyValues(exampleSettings, profile.exampleSettings)
        this.setState({
            exampleSettings: exampleSettings
        })
    }

    private renderSettings(exampleSettings: ExampleSettings) {
        const isInputDisabled = this.isInputDisabled
        const key = JSON.stringify([isInputDisabled, exampleSettings])

        return !this.state.isSettingsOpened ? '' : (
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Минимум</th>
                    <th>Максимум</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Значение</th>
                    <td>
                        <SettingInput exampleSettings={exampleSettings} name='minValue' key={key}
                                      disabled={isInputDisabled}/>
                    </td>
                    <td>
                        <SettingInput exampleSettings={exampleSettings} name='maxValue' key={key}
                                      disabled={isInputDisabled}/>
                    </td>
                </tr>
                <tr>
                    <th>Результат</th>
                    <td>
                        <SettingInput exampleSettings={exampleSettings} name='minResult' key={key}
                                      disabled={isInputDisabled}/>
                    </td>
                    <td>
                        <SettingInput exampleSettings={exampleSettings} name='maxResult' key={key}
                                      disabled={isInputDisabled}/>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

    private renderOperationCheckbox(operation: Operation) {
        const operationNames = {
            [Operation.Add]: 'Сложение',
            [Operation.Sub]: 'Вычитание',
            [Operation.Mult]: 'Умножение',
            [Operation.Div]: 'Деление',
        }

        return (
            <div className={css.main_operation_checkox_block}>
                <input className={css.main_operation_checkox}
                    id={'MainOperationCheckox' + operation}
                    type="checkbox"
                    checked={this.state.taskSettings.operations.includes(operation)}
                    onChange={this.changeCheckboxHandler.bind(this, operation)}/>
                    <label key={operation} htmlFor={'MainOperationCheckox' + operation}>
                        {operationNames[operation]}
                    </label>
            </div>
        )
    }

    private changeCheckboxHandler(operation: Operation): void {
        const taskSettings = this.state.taskSettings
        const enabledOperations = taskSettings.operations
            .filter((enabledOperation: Operation): boolean => enabledOperation !== operation)

        if (!taskSettings.operations.includes(operation)) {
            enabledOperations.push(operation)
        }

        taskSettings.operations = enabledOperations
        this.setState({
            taskSettings: taskSettings
        })
    }
}
