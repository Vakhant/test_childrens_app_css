import {Example} from "../Example/Example";
import React from "react";
import {TaskProvider} from "../Task/TaskProvider";
import {ExampleProvider} from "../Example/ExampleProvider";
import {Task} from "../Task/Task";
import css from './Solve.module.css';

interface Props {
    taskProvider: TaskProvider
    exampleProvider: ExampleProvider
    openConfiguration: () => void
    openTaskResult: () => void
}

interface State {
    example: Example
    answer: string
}

export class Solve extends React.Component<Props, State> {
    public readonly state: State = {
        example: this.getActualOrNewExample(),
        answer: '',
    }

    public render() {
        const task = this.getCurrentOrNewTask()

        return (
            <div className='wrap'>
                <div className='header'>
                    <h1>Задание</h1>
                    <svg className={css.options_btn + ' header_btn'} xmlns="http://www.w3.org/2000/svg" width="30.548" height="30.548" viewBox="0 0 30.548 30.548"  onClick={this.props.openConfiguration}>
                        <g id="settings" transform="translate(0 0)">
                            <path id="Контур_6" data-name="Контур 6" d="M16.233,30.548H14.316A2.815,2.815,0,0,1,11.5,27.736v-.649a12.333,12.333,0,0,1-1.915-.795l-.46.46a2.812,2.812,0,0,1-3.978,0L3.8,25.4a2.812,2.812,0,0,1,0-3.978l.459-.459a12.333,12.333,0,0,1-.795-1.915H2.812A2.815,2.815,0,0,1,0,16.233V14.316A2.815,2.815,0,0,1,2.812,11.5h.649a12.336,12.336,0,0,1,.795-1.915l-.46-.46a2.812,2.812,0,0,1,0-3.978L5.152,3.8a2.812,2.812,0,0,1,3.977,0l.459.459A12.344,12.344,0,0,1,11.5,3.461V2.812A2.815,2.815,0,0,1,14.316,0h1.917a2.815,2.815,0,0,1,2.812,2.812v.649a12.332,12.332,0,0,1,1.915.795l.46-.46a2.812,2.812,0,0,1,3.978,0l1.355,1.355a2.812,2.812,0,0,1,0,3.978l-.459.459a12.333,12.333,0,0,1,.795,1.915h.649a2.815,2.815,0,0,1,2.812,2.812v1.917a2.815,2.815,0,0,1-2.812,2.812h-.649a12.336,12.336,0,0,1-.795,1.915l.46.46a2.812,2.812,0,0,1,0,3.978L25.4,26.752a2.812,2.812,0,0,1-3.977,0l-.459-.459a12.344,12.344,0,0,1-1.915.795v.649A2.815,2.815,0,0,1,16.233,30.548ZM9.887,24.413a10.549,10.549,0,0,0,2.734,1.135.9.9,0,0,1,.671.867v1.321a1.023,1.023,0,0,0,1.022,1.022h1.917a1.023,1.023,0,0,0,1.022-1.022V26.415a.9.9,0,0,1,.671-.867,10.549,10.549,0,0,0,2.734-1.135.9.9,0,0,1,1.088.138l.936.936a1.022,1.022,0,0,0,1.445,0l1.356-1.356a1.022,1.022,0,0,0,0-1.445l-.936-.936a.9.9,0,0,1-.138-1.088,10.548,10.548,0,0,0,1.135-2.734.9.9,0,0,1,.867-.671h1.321a1.023,1.023,0,0,0,1.022-1.022V14.316a1.023,1.023,0,0,0-1.022-1.022H26.415a.9.9,0,0,1-.867-.671,10.55,10.55,0,0,0-1.135-2.734A.9.9,0,0,1,24.551,8.8l.936-.936a1.022,1.022,0,0,0,0-1.445L24.131,5.062a1.022,1.022,0,0,0-1.445,0L21.749,6a.9.9,0,0,1-1.088.138A10.549,10.549,0,0,0,17.927,5a.9.9,0,0,1-.671-.867V2.812A1.023,1.023,0,0,0,16.233,1.79H14.316a1.023,1.023,0,0,0-1.022,1.022V4.134A.9.9,0,0,1,12.622,5,10.549,10.549,0,0,0,9.888,6.135.9.9,0,0,1,8.8,6l-.936-.936a1.022,1.022,0,0,0-1.445,0L5.062,6.417a1.022,1.022,0,0,0,0,1.445L6,8.8a.9.9,0,0,1,.138,1.088A10.548,10.548,0,0,0,5,12.622a.9.9,0,0,1-.867.671H2.812A1.024,1.024,0,0,0,1.79,14.316v1.917a1.023,1.023,0,0,0,1.022,1.022H4.134A.9.9,0,0,1,5,17.926a10.55,10.55,0,0,0,1.135,2.734A.9.9,0,0,1,6,21.749l-.936.936a1.022,1.022,0,0,0,0,1.445l1.356,1.356a1.022,1.022,0,0,0,1.445,0l.936-.936a.9.9,0,0,1,1.089-.137Z" fill="#758eb1"/>
                            <path id="Контур_7" data-name="Контур 7" d="M151.247,157.893a6.647,6.647,0,1,1,6.647-6.647A6.654,6.654,0,0,1,151.247,157.893Zm0-11.5a4.857,4.857,0,1,0,4.857,4.857A4.862,4.862,0,0,0,151.247,146.39Z" transform="translate(-135.972 -135.972)" fill="#758eb1"/>
                        </g>
                    </svg>
                </div>
                <div className='container'>
                    <form onSubmit={this.submitHandler.bind(this)}>
                        <div className={css.name}>
                            <h2>Пример №{task.currentExampleNumber} из {task.taskSettings.examplesCount}</h2>
                        </div>
                        <div className={css.state_example_string}>{this.state.example.string} = </div>
                        <div className={css.answer_input_answer_wrap}>
                            <input
                            className={css.input_text + ' input_text'}
                            type="text"
                            value={this.state.answer}
                            onChange={this.changeHandler.bind(this)}/>
                            <button className={css.answer_btn_agree} type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25.828" height="16.828" viewBox="0 0 25.828 16.828">
                                <g id="Сгруппировать_7" data-name="Сгруппировать 7" transform="translate(-498.086 -285.473)">
                                    <line id="Линия_13" data-name="Линия 13" x2="9" y2="9" transform="translate(499.5 291.887)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                                    <line id="Линия_14" data-name="Линия 14" y1="14" x2="14" transform="translate(508.5 286.887)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2"/>
                                </g>
                            </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    private changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            answer: event.target.value
        })
    }

    private submitHandler(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const answer = this.state.answer;

        if ('' === answer) {
            return
        }

        this.setState({
            answer: ''
        })

        const example = this.state.example;
        example.answer = +answer

        if (this.getCurrentOrNewTask().isSolved) {
            this.props.openTaskResult()

            return
        }

        this.setState({
            example: this.getActualOrNewExample()
        })
    }

    private getCurrentOrNewTask(): Task {
        return this.props.taskProvider.getCurrentOrNewTask();
    }

    private getActualOrNewExample(): Example {
        return this.props.exampleProvider.getActualOrNewExample(this.getCurrentOrNewTask())
    }
}
