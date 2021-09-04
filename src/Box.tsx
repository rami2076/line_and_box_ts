import React from 'react';
import './Box.css'

type MyProps = {
    /**
     * 初期ラベル値
     */
    id: string
};

type MyState = {
    opacity: number
    label: string
    lazyId: string
    id: string
};

/**
 * onDragStart->onDrop->onDragEndの順でイベントが発生する
 */
export class Box extends React.Component<MyProps, MyState> {

    /**
     * @private 新規ラベル用のキャッシュ値 TODO:: JSONの方がいいかも
     */
    private static cacheForNewId: string = "";
    private static cacheForNewLabel: string = "";


    constructor(prop: MyProps) {
        super(prop);
        const newId = prop.id
        this.state = this.getDefaultState(newId, "DEFAULT_" + prop.id)
    }

    render() {
        return (<div
                style={{opacity: this.state.opacity}}
                onDragStart={e => this.onDragStart(e)}
                onDragEnd={e => this.onDragEnd(e)}
                onDragLeave={() => this.dragLeave()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => this.onDrop(e)}
                className="box" draggable={true}>
                <p itemID={this.state.id} id={this.state.id}>{this.state.label}</p>
            </div>
        )
    }

    /**
     * デフォルトの状態
     */
    getDefaultState(newLazyId: string, newLabel: string) {
        return {
            opacity: 1,
            label: newLabel,
            lazyId: newLazyId,
            /**
             * ElementのIDを交換するためにPrefixを付与
             */
            id: "default_" + newLazyId
        }
    }

    /**
     * Move中の状態
     */
    getMoveState() {
        return {
            opacity: 0.5,
            label: this.state.label,
            lazyId: this.state.lazyId,
            /**
             * ElementのIDを交換するためにPrefixを付与
             */
            id: "move_" + this.state.lazyId
        }
    }

    /**
     * 選択中のElementでドラッグイベント発生下場合に発火するイベント
     *
     * @param e  React.DragEvent<HTMLDivElement>
     */
    onDragStart(e: React.DragEvent<HTMLDivElement>) {
        const state = this.getMoveState();
        this.setState(state);
        //Drop先に自身のラベルを渡す
        e.dataTransfer.setData("text", JSON.stringify(this.state))
        //自分自身にDropせずにDragが終わったとき用
        Box.cacheForNewId = this.state.lazyId
        Box.cacheForNewLabel = this.state.label

    }

    /**
     * ドラッグElementのDrag先のオブジェクトにDropされた場合に発火するイベント
     *
     * @param e  React.DragEvent<HTMLDivElement>
     */
    private onDrop(e: React.DragEvent<HTMLDivElement>) {
        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }
        //Drag元に自身のラベルを渡す
        Box.cacheForNewId = this.state.lazyId
        Box.cacheForNewLabel = this.state.label

        //Drag元からラベルを受け取る
        const stateString: string = e.dataTransfer.getData("text")
        const s: MyState = JSON.parse(stateString)
        const state = this.getDefaultState(s.lazyId, s.label)
        this.setState(state);
        return false;
    }

    /**
     * 選択中のElementでドラッグイベントが終了した時に発火するイベント
     *
     * @param e React.DragEvent<HTMLDivElement>
     */
    onDragEnd(e: React.DragEvent<HTMLDivElement>) {
        //Drop先のラベルを受け取る
        const newId = Box.cacheForNewId
        const newLabel = Box.cacheForNewLabel
        const state = this.getDefaultState(newId, newLabel)
        this.setState(state);
    }

    private dragLeave() {
        // 記述しない
    }
}

