import {TaskSettings} from "./TaskSettings";
import {Operation} from "../Example/Operation";
import {TaskSettingsNormalizer} from "./TaskSettingsNormalizer";
import {ProfileProvider} from "../Example/ProfileProvider";
import {clone} from "../ObjectManipulator";

const storageKey = 'task-settings-v1';

export class TaskSettingsManager {
    public constructor(
        private readonly taskSettingsNormalizer: TaskSettingsNormalizer,
        private readonly profileProvider: ProfileProvider
    ) {
    }

    public getCurrentSettings(): TaskSettings {
        const item = localStorage.getItem(storageKey)

        if (null === item) {
            return {
                examplesCount: 10,
                operations: [Operation.Add],
                addSettings: clone(this.profileProvider.defaultAddProfile.exampleSettings),
            }
        }

        const taskSettings = JSON.parse(item)

        return taskSettings
    }

    public saveTaskSettings(taskSettings: TaskSettings): void {
        this.taskSettingsNormalizer.normalize(taskSettings)
        localStorage.setItem(storageKey, JSON.stringify(taskSettings))
    }
}
