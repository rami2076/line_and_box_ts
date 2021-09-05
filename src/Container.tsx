import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "./Box";
import React from "react";
import './Box.css'

type Prop = {}
type State = {
    children: number[]
}

// noinspection UnnecessaryLocalVariableJS
export class Container extends React.Component<Prop, State> {

    countOfChild: number = 0;

    constructor(prop: Prop) {
        super(prop);
        let s = {//TODO::Refactoring target . Cause Duplicate.
            children: []
        }
        this.state = s;
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.add()} variant='primary'>Primary
                </Button>
                <div id="container"
                     className={"container"}>
                    {this.state.children.map(item => {
                        return (<Box key={item} id={item.toString()}/>)//TODO::Box内のボタンをクリックされた場合新しいBoxを作成したいけどどうしたらいいかよくわからない。
                    })}
                </div>
            </div>
        )
    }

    add() {
        this.state.children.push(this.countOfChild)
        const s = {//TODO::Refactoring target . Cause Duplicate.
            children: this.state.children
        }
        this.countOfChild++
        this.setState(s)
    }


}

