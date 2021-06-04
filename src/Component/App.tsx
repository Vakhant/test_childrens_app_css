import React from 'react';
import {Solve} from "./Solve";
import {ExampleProvider} from "../Example/ExampleProvider";
import {TaskProvider} from "../Task/TaskProvider";
import {TaskSettingsManager} from "../Task/TaskSettingsManager";
import {ExampleGenerator} from '../Example/ExampleGenerator'
import {CoefficientGenerator} from "../Example/CoefficientGenerator";
import {OperationGeneratorCollection} from "../Example/OperationGeneratorCollection";
import {AddGenerator} from "../Example/AddGenerator";
import {RatingGenerator} from "../Task/RatingGenerator";
import {RevertGenerator} from "../Example/RevertGenerator";
import {TaskSettingsNormalizer} from "../Task/TaskSettingsNormalizer";
import {ProfileProvider} from "../Example/ProfileProvider";
import {ExampleSettingsNormalizer} from "../Example/ExampleSettingsNormalizer";
import {TaskResult} from "./TaskResult";
import {TaskConfig} from "./TaskConfig";
import {MultGenerator} from "../Example/MultGenerator";

const addGenerator = new AddGenerator()
const multGenerator = new MultGenerator()
const operationGeneratorCollection = new OperationGeneratorCollection([
    addGenerator,
    new RevertGenerator(addGenerator),
    multGenerator,
    new RevertGenerator(multGenerator),
])
const coefficientGenerator = new CoefficientGenerator()
const exampleGenerator = new ExampleGenerator(operationGeneratorCollection, coefficientGenerator)
const exampleProvider = new ExampleProvider(exampleGenerator)
const exampleSettingsNormalizer = new ExampleSettingsNormalizer()
const taskSettingsNormalizer = new TaskSettingsNormalizer(exampleSettingsNormalizer)
const profileProvider = new ProfileProvider(exampleSettingsNormalizer)
const taskSettingsManager = new TaskSettingsManager(taskSettingsNormalizer, profileProvider)
const taskProvider = new TaskProvider(taskSettingsManager)
const ratingGenerator = new RatingGenerator()

enum Page {
    Solve = 1,
    TaskResult,
    TaskConfig,
}

interface State {
    page: Page
}

export class App extends React.Component<{}, State> {
    public readonly state: State = {
        page: Page.Solve,
    }

    public render() {
        const router = {
            [Page.Solve]: <Solve
                taskProvider={taskProvider}
                exampleProvider={exampleProvider}
                openConfiguration={this.openPage.bind(this, Page.TaskConfig)}
                openTaskResult={this.openPage.bind(this, Page.TaskResult)}/>,
            [Page.TaskResult]: <TaskResult
                ratingGenerator={ratingGenerator}
                taskProvider={taskProvider}
                startNewTask={this.startNewTask.bind(this)}/>,
            [Page.TaskConfig]: <TaskConfig
                profileProvider={profileProvider}
                taskSettingsManager={taskSettingsManager}
                startNewTask={this.startNewTask.bind(this)}/>,
        }

        return (
            <>
                {router[this.state.page]}
            </>
        )
    }

    private startNewTask(): void {
        taskProvider.cleanCurrentTask()
        this.openPage(Page.Solve)
    }

    private openPage(page: Page): void {
        this.setState({
            page: page
        })
    }
}
