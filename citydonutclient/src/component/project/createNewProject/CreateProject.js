import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import MyCustomMap from './MyCustomMap';
import GoogleLocation from './GoogleLocation';

export class CreateProject extends React.Component {
    state = {
        files: [],
        categoryName: 'Категорія проекту',
        allCategories: [],
        street: {
            place: '',
            coordinates: {
                lat: 0,
                lng: 0,
            },
            status: undefined,
        },
        name: undefined,
        description: undefined,
        moneyNeeded: 0,
        categories: undefined,
        galleryId: 0,
        projectId: undefined,

    };

    setFile = (e) => {
        this.setState({files: e.target.files});
        console.log(e.target.files);
    };

    setName = (e) => {
        this.setState({name: e.target.value});
    };

    setDescription = (e) => {
        this.setState({description: e.target.value});
    };

    setMoney = (e) => {
        this.setState({moneyNeeded: parseFloat(e.target.value)});
    };

    setPlace = (place) => {
        this.setState({
            street: {
                place: place.place,
                coordinates: {
                    lat: parseFloat(place.coordinates.lat),
                    lng: parseFloat(place.coordinates.lng),
                },
            },
        });
    };

    setCategory = (event, e) => {
        this.setState({
            categories: e.target.innerText,
        });
    };

    getCategories = () => {
        axios.get('http://localhost:8091/api/v1/category/all')
            .then(response => this.setState({
                allCategories: response.data,
            }));
    };


    sendData = () => {
        const data = {
            name: this.state.name,
            description: this.state.description,
            location: this.state.street.place,
            locationLatitude: this.state.street.coordinates.lat,
            locationLongitude: this.state.street.coordinates.lng,
            moneyNeeded: this.state.moneyNeeded,
            categories: [this.state.categories],
        };
        console.log(data);


        axios.post('http://localhost:8091/api/v1/project',
            data,
            {withCredentials: true})
            .then((response => {
                this.setState({
                        projectId: response.data.id
                    }
                )
            }))
            .then((response) => {
                axios.get(`http://localhost:8091/api/v1/project/${this.state.projectId}/gallery`,
                    {withCredentials: true}).then((response) => {


                    this.setState({galleryId: response.data});
                }).then((response) => {
                    const fileData = new FormData();
                    Array.from(this.state.files).forEach((file, i) => {
                        console.log(file);
                        fileData.append('files', file);
                    });
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    };
                    console.log(fileData);
                    axios.post(
                        `http://localhost:8091/api/v1/gallery/${this.state.galleryId}/`,
                        fileData,
                        config,
                        {withCredentials: true},
                    ).then((response) => {
                        this.setState(
                            {
                                status: response.status
                            }
                        )
                    })
                });

            })

    };

    goodJob(){
        if(this.state.status === 200)
            return(
                    <Button variant="primary" href="http://localhost:3000" style={{marginLeft: '10px'}}>На головну сторінку</Button>
            )
    }

    componentDidMount() {
        this.sendData();
        this.getCategories();
    }

    render() {
        return (
            <Modal.Dialog style={{width: '600px', height: '500'}}>
                <Modal.Title style={{textAlign: 'center'}}>Створити проект</Modal.Title>

                <Modal.Body>

                    <div style={{width: '100%'}}>
                        <label htmlFor="pName"> Назва проекту:</label>

                        <input
                            type="text"
                            name="name"
                            autoComplete="off"
                            required
                            placeholder="Назва проекту..."
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                margin: '8px 0',
                                display: 'inline-block',
                                border: '1px solid #ccc',
                                borderRadius: '4px',

                            }}

                            onChange={this.setName}
                        />

                        <label htmlFor="pDescription">Опис:</label>
                        <textarea
                            id="pDescription"
                            name="description"
                            autoComplete="off"
                            required
                            placeholder="Про проект..."
                            style={{
                                resize: 'none',
                                width: '100%',
                                height: '100px',
                                padding: '12px 20px',
                                margin: '8px 0',
                                display: 'inline-block',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                            }}
                            onChange={this.setDescription}
                        />
                        <label htmlFor="projectPrice">Необхідні кошти для реалізації проекту :</label>
                        <input
                            type="number"
                            autoComplete="off"
                            required
                            className="form-control"
                            name="projectPrice"
                            onChange={this.setMoney}
                        />

                        <label htmlFor="pLocation">Адреса :</label>
                        <GoogleLocation id="pLocation" setPlace={this.setPlace}/>

                        <label>Категорія проекту :</label>

                        <Dropdown onSelect={this.setCategory}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {this.state.categories}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.state.allCategories.map(item => (
                                    <Dropdown.Item eventKey={item.id}>
                                        {item.category}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <label htmlFor="pFile">Додаткові матеріали :</label>
                        <br/>

                        <label
                            htmlFor="file-upload"
                            style={{
                                border: '1px solid #ccc',
                                width: '200px',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                padding: '6px 30px',
                                cursor: 'pointer',
                            }}
                        >
                            Загрузити файли
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            style={{display: 'none', margin: '10px 0px 60px 60px'}}
                            multiple
                            onChange={this.setFile}
                        />

                        <div>
                            {Array.from(this.state.files).map(file => (
                                <ul>
                                    <li>{file.name}</li>
                                </ul>
                            ))}

                        </div>


                    </div>

                    <div style={{
                        height: '400px',
                        width: '350px',
                        margin: '30px 0px 60px 60px',
                    }}
                    >

                        <MyCustomMap style={{width: '300px', height: '300px'}} location={this.state.street}/>

                    </div>
                </Modal.Body>
                <Modal.Footer style={{display: 'inline-block'}}>

                        {this.goodJob()}
                        <Button variant="primary" onClick={this.sendData} style={{float:'left'}}>Надіслати</Button>

                </Modal.Footer>
            </Modal.Dialog>
        );
    }
}

export default CreateProject;
