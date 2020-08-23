import React, { useEffect, useState } from 'react';
import Axios from 'axios';



function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = { userTo: props.userTo}
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setSubscribeNumber(res.data.subscribeNumber);
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                }
            })

        let subscribeVariable = { userTo: props.userTo, userFrom: props.userFrom }
        Axios.post('/api/subscribe/subscribed', subscribeVariable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setSubscribed(res.data.subscribed);
                } else {
                    alert('구독자 정보를 받아오지 못했습니다.');
                }
            })
    }, []);

    const onSubscribe = () => {

        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then(res => {
                    if(res.data.success){
                        console.log(res.data);
                        setSubscribed(!Subscribed);
                        setSubscribeNumber(SubscribeNumber -1);
                    } else {
                        alert('구독 취소에 실패 했습니다.');
                    }
                })
        } else {
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(res => {
                    if(res.data.success){
                        console.log(res.data);
                        setSubscribed(!Subscribed);
                        setSubscribeNumber(SubscribeNumber +1);
                    } else {
                        alert('구독에 실패 했습니다.');
                    }
                })

        }
    }

    return (
        <div>
            <button 
            onClick={onSubscribe}
            style={{
                backgroundColor: `${Subscribed ?  '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} { Subscribed ? 'Subscribed' : 'Subscribe' }
            </button>
        </div>
    )
}

export default Subscribe
