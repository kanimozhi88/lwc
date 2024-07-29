// import { LightningElement } from 'lwc';

// export default class TemplateLooping extends LightningElement {
//     items = [
//         { id: 1, name: 'Apple' },
//         { id: 2, name: 'Banana' },
//         { id: 3, name: 'Orange' },
//         { id: 4, name: 'Grapes' }
//     ];
// }
import { LightningElement, track } from 'lwc';

export default class ExampleIterator extends LightningElement {
    @track items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' }
    ];
}