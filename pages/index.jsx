import React, {Component, Fragment} from 'react';

import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components';
import {store} from "next/dist/build/output/store";

const RoomLayout = styled.div`
    display:flex;
`;

const SingleRoomItem = styled.div`
   background:#efefef;
   padding:20px;
   margin-right:20px;
   
`;

const SingleRoomDetail = styled.div`
     background:${props => props.disabled ? '#efefef' : 'white'};
     padding:20px;
     display:flex;
     cursor:${props => props.disabled ? 'not-allowed' : 'auto'
}
`;

const MarginRight = styled.span`
   margin-right : ${props => props.margin ? props.margin : '10'} px;
`;


const SubmitButton = styled.button`
  background:grey;
`;

export const rooms = [{

    id: 1,
    name: 'Room 1',
    disabled: false,
    selected: true,
    adult: 1,
    child: 0
}, {
    id: 2,
    name: 'Room 2',
    disabled: true,
    selected: false,
    adult: 1,
    child: 0
}, {
    id: 3,
    name: 'Room 3',
    disabled: true,
    selected: false,
    adult: 1,
    child: 0
}, {

    id: 4,
    name: 'Room 4',
    disabled: true,
    selected: false,
    adult: 1,
    child: 0
}];




class Index extends Component {


    state = {
        rooms
    };


    componentDidMount() {
        if (window.localStorage.getItem('rooms')) {
            let storedRooms = JSON.parse(window.localStorage.getItem('rooms'));
            this.setState({
                rooms: storedRooms
            })
        }
    }

    render() {
        return (
            <Fragment>
                <RoomLayout>
                    {this.state.rooms.map((item) => this.renderRoom(item))}
                </RoomLayout>
                <SubmitButton type={'button'} onClick={this.onClick}>submit</SubmitButton>
            </Fragment>

        );
    }

    onClick = () => {
        let rooms = JSON.stringify(this.state.rooms);
        window.localStorage.setItem('rooms', rooms);
    };

    onChange = (e) => {
        let rooms = this.state.rooms;
        if (e.target.name === 'roomName') {
            let selectedRoom = rooms.find((i) => i.id === parseInt(e.target.value));
            if (selectedRoom.disabled) {
                for (let i = 0; i < parseInt(e.target.value); i++) {
                    rooms[i].disabled = false;
                    if (selectedRoom.id === rooms[i].id)
                       rooms[i].selected = true; 
                }
            } else {
                for (let i = parseInt(e.target.value); i <= rooms.length; i++) {
                    rooms[i - 1].disabled = true;
                    rooms[i - 1].adult = 1;
                    rooms[i - 1].child = 0;

                    if (selectedRoom.id === rooms[i - 1].id)
                        rooms[i - 1].selected = false;
                }
            }
        }


        this.setState({
            rooms
        })
    };

    handleSelectChange = (e, room) => {
        let rooms = this.state.rooms;
        if (e.target.name === 'adult') {
            rooms = rooms.map((i) => {
                if (i.id === room.id)
                    i.adult = e.target.value;
                return i;
            });
        } else if (e.target.name === 'child') {
            rooms = rooms.map((i) => {
                if (i.id === room.id)
                    i.child = e.target.value;
                return i;
            })
        }
        this.setState({
            rooms
        })
    };

    renderRoom(room) {
        return (
            <SingleRoomItem key={room.id} className='single-room' selected={room.selected}>
                <div>
                    <h4><input type='checkbox' value={room.id} checked={!room.disabled} name='roomName'
                               onChange={this.onChange}/>{room.name}
                    </h4>
                    <SingleRoomDetail disabled={room.disabled}>
                        <MarginRight margin={10}>
                            Adults(18+)
                            <br/>
                            <select disabled={room.disabled} value={room.adult} name='adult'
                                    onChange={(e) => this.handleSelectChange(e, room)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </MarginRight>
                        <span>
                        Children(0-17)<br/>
                        <select disabled={room.disabled} value={room.child} name='child'
                                onChange={(e) => this.handleSelectChange(e, room)}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                        </span>
                    </SingleRoomDetail>
                </div>
            </SingleRoomItem>
        )
            ;
    }
}

export default Index;
