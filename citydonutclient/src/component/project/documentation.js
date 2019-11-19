import React from "react";
export class Document extends React.Component {

    state={
        files: []
    }

    componentDidMount() {
        return fetch(`http://localhost:8091/api/v1/project/${this.props.projectId}/fileInfo`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let url = responseJson.filter(obj => obj.mediaType === "doc");
                this.setState({files: url}, function () {
                });
            })
    }

    render(){

        const { files } = this.state;
        return(
            <div>
                {files.map(file => (
                    <a href = {file.fileDownloadUri}>{file.fileName}</a>

                ))}
            </div>

        );
    }
}