import React from 'react';
import axios from 'axios';
import ProgressBar from '../progressBar/progressBar';
import MyModal from './MyModal';

export class ProjectProgressBar extends React.Component {
    state={

        today: new Date(),
        contributors: 0,
        donatesSum: 0,
        donatedPercent: 0,
    };

    componentDidMount() {
        this.getContributors();
        this.getDonatesSum();
    }

    getDaysLeft=() => {
        const endDate = new Date(this.props.endDate);
        const Result = (endDate.getTime() - this.state.today.getTime()) / (1000 * 3600 * 24);
        this.days = Result.toFixed(0);
        if (this.days < 0) {
            this.days = 0;
        }
        return this.days;
    };


    getContributors = () => {
        axios.get(`http://localhost:8091/api/v1/donates/count/project/${this.props.projectId}`,
            { withCredentials: true }).then((response) => {
            this.setState({ contributors: response.data });
        });
    };

    getDonatesSum = () => {
        axios.get(`http://localhost:8091/api/v1/donates/all/projects/${this.props.projectId}`,
            { withCredentials: true }).then((response) => {
            this.setState({
                donatesSum: response.data,
                donatedPercent: response.data * 100 / this.props.moneyNeeded,
            });
        });
    };

    render() {
        return (
            <div className="row-full " style={{ background: '#f0f0f0', width: '100%', height: '80px' }}>
                <div className="d-flex justify-content-around align-items-center">

                    <h5 style={{ margin: '17px', width: '23%' }}>
Залишилось днів:
                        {this.getDaysLeft()}
                    </h5>
                    <ProgressBar
                        style={{ height: '26px', width: '30%', margin: '' }}
                        doneTip="Зібрано!"
                        donePercent={this.state.donatedPercent}
                        doneLabel={`${this.state.donatesSum}`}
                        undoneTip="Потрібно зібрати!"
                        undoneLabel={`${this.props.moneyNeeded - this.state.donatesSum}`}
                    />

                    <h5 style={{ margin: '' }}>
Доброчинців:
                        {this.state.contributors}
                    </h5>

                    <MyModal
                        projectId={this.props.projectId}
                        getDonatesSum={this.getDonatesSum}
                        getContributors={this.getContributors}
                    />
                </div>
            </div>
        );
    }
}
