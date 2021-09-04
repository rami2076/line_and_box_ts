import React from 'react';

type MyProps = {
    // using `interface` is also ok
    title: string;
};
type MyState = {
    count: number; // like this
};

class Title extends React.Component<MyProps, MyState> {
    render() {
        return (
            <h1>
                {this.props.title}
            </h1>
        );
    }
}


export default Title;
