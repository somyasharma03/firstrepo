import { LightningElement } from 'lwc';

export default class PickList extends LightningElement {
    get renderOptionalField() {
        return this.level === 'Primary' && this.leadSource === 'Web' ? true : false;
    }
    handleLevelEvent(event) {
        this.level = event.target.value;
    }
    handleSourceEvent(event) {
        this.leadSource = event.target.value;
    }
}