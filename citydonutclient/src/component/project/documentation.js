import React from "react";

export class Document extends React.Component {

    state={
        files: []
    };



     componentDidMount() {
       return fetch(`http://localhost:8091/api/v1/gallery/${this.props.galleryId}/`)
             .then((response) => response.json())
             .then((responseJson) => {
                 let url = responseJson.filter(obj => obj.mediaType === "doc");
                 this.setState({files: url}, function () {
                 });
             })
     };

     render(){

        const { files } = this.state;
        return(
            <div>
                {files.map(file => (
                    <ul>
                        <li>
                            <a href = {file.fileDownloadUri}>{file.fileName}</a>
                        </li>
                    </ul>
                ))}
            </div>
        );
    }
}
