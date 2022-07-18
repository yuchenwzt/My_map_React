import React from 'react';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }

    render() {
        const history = this.props.history;
        console.log("history: " + history.length);

        var totalPageNum = history.length > 0 ? (history.length / 10 > Math.trunc(history.length / 10) ? Math.trunc(history.length / 10) + 1 : Math.trunc(history.length / 10)) : 1;
        var pageList = [];
        for (let i = 1; i <= totalPageNum; i++) {
            pageList.push(i);
        }

        var pages = pageList.map((p) => {
            return (
                <a
                    key={p}
                    id="page"
                    href={"#history" + p}
                    onClick={() => this.changePage(p)}>
                    {p}
                </a>
            );
        });

        const currentPage = this.state.page;
        console.log("current page: " + currentPage);
        const crrentPageHistory = history.length > 0 ? history.slice(10 * (currentPage - 1), 10 * currentPage) : history;
        if (history.length > 0) {
            console.log(10 * (currentPage - 1), 10 * (currentPage) - 1);
        }
        var singleHistories = crrentPageHistory.map((h) => {
            return (
                <div key={h.num}>
                    <SingleHistory
                        num={h.num}
                        name={h.name}
                        location={h.location}
                        checked={h.checked}
                        onCheckboxChange={(num) => this.props.onCheckboxChange(num)}
                        onDeleteClick={this.props.onDeleteClick} />
                </div>);
        });

        return (
            <div>
                <h2>
                    Search Histories
                </h2>
                <button
                    onClick={() => this.onDeleteClick()}> delete </button>
                <ul>
                    {singleHistories}
                </ul>
                <div>
                    page
                    {pages}
                </div>
            </div>
        );
    }

    onDeleteClick() {
        console.log("delete");
        this.props.deleteRecord();
    }

    changePage(page) {
        console.log("changePage");
        this.setState({
            page: page,
        });
    }
}

class SingleHistory extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { checked: this.props.checked }
    }

    onCheckboxChange = () => {
        // this.setState({checked: !this.state.checked});
        const num = this.props.num;
        this.props.onCheckboxChange(num);
    }

    render() {
        const num = this.props.num;
        const name = this.props.name;
        const location = this.props.location;

        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={() => this.onCheckboxChange()}
                ></input>
                <label> {num} {name} ({location.lat}, {location.lng}) </label>
            </li>
        )
    }
}

export { History };