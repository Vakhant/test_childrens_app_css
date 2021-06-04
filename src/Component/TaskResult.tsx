import React from "react";
import {Task} from "../Task/Task";
import {RatingGenerator} from "../Task/RatingGenerator";
import {StartNewTaskButton} from "./StartNewTaskButton";
import {TaskProvider} from "../Task/TaskProvider";
import css from './TaskResult.module.css';

interface Props {
    ratingGenerator: RatingGenerator
    taskProvider: TaskProvider
    startNewTask: () => void
}

export class TaskResult extends React.Component<Props> {
    public render() {
        const task = this.props.taskProvider.getCurrentOrNewTask()

        return (
            <div className='wrap'>
                <div className='header'>
                    <h1>Результаты задания</h1>
                    <StartNewTaskButton onClick={this.props.startNewTask}/>
                </div>
                <div className="container">
                    <ul>
                        <li>Решено примеров: {task.solvedExamplesCount}</li>
                        <li>Ошибок: {task.wrongExamplesCount}</li>
                        <li>Оценка: {this.props.ratingGenerator.getRating(task)}</li>
                    </ul>
                    <h2>Примеры</h2>
                    <table className={css.result_table}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Пример</th>
                            <th>Ответ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.showExamples(task)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    private showExamples(task: Task) {
        const examples = []
        let number = 1

        for (let example of task.examples) {
            examples.push(
                <tr>
                    <td>{number}</td>
                    <td>{example.string}</td>
                    <td>{example.answer}</td>
                </tr>
            )

            if (example.isSolved) {
                number++
            }
        }

        return examples
    }
}
