import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const subject = new Subject();
//scan example building an object over time
const example = subject.pipe(
  scan((acc, curr) => {
    console.log('scan:' + JSON.stringify(curr));
    return Object.assign({}, acc, curr);
  }, {})
);
//log accumulated values
const subscribe = example.subscribe((val) =>
  console.log('Accumulated object:', val)
);
//next values into subject, adding properties to object
// {name: 'Joe'}
subject.next({ name: 'Joe' });
// {name: 'Joe', age: 30}
subject.next({ age: 30 });
// {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
subject.next({ favoriteLanguage: 'JavaScript' });
subject.next({ lastname: 'Smith' });
subject.next({ name: 'Bill' });
subject.next({ lastname: 'Jones' });
subject.next(9);


const subjectb = new BehaviorSubject(123);

// two new subscribers will get initial value => output: 123, 123
subjectb.subscribe(console.log);
subjectb.subscribe(console.log);

// two subscribers will get new value => output: 456, 456
subjectb.next(456);

// new subscriber will get latest value (456) => output: 456
subjectb.subscribe(console.log);

// all three subscribers will get new value => output: 789, 789, 789
subjectb.next(789);

export interface Thread {
  id: string;
  name: string;
  messages: string[];
}

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
};

const initialState: ThreadsState = {
  ids: ['6','7'],
  currentThreadId: '0',
  entities: {}
};

let thread: Thread = {id:'1', name:'bill', messages: ['one']};
let thread2: Thread = {id:'2', name:'joe', messages: ['two']};
let entities: ThreadsEntities = {};

entities = Object.assign({}, { [thread.id]: thread }, { [thread2.id]: thread2 } );

console.log("running 2");
console.log( JSON.stringify(entities) );
console.log( JSON.stringify(entities['1']) );
console.log( JSON.stringify(entities['2']) );
