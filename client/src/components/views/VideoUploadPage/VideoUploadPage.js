import React from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between'}}>
                    <Dropzone 
                    onDrop 
                    multiple
                    maxSize>
                        {({ getRootProps, getInputProps })=>(
                            <div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display:'flex', alignItems: 'center', justifyContent: 'center' }}{...getRootProps()}>
                                
                            <input {...getInputProps()}/>
                            <Icon type="plus" style={{ fontSize:'3rem'}}/>
                            </div>
                        )}
                    </Dropzone>
                    <div>
                        <img src="" alt="" srcset=""/>
                    </div>
                </div>
                <br/>
                <br/>
                <label htmlFor="">Title</label>
                <Input onChange value/>
                <br/>
                <br/>
                <label htmlFor="">Description</label>
                <TextArea/>
                <br/>
                <br/>
                <select onChange name="" id="">
                    <option value=""></option> 
                </select>
                <br/><br/>
                <select onChange name="" id="">
                    <option value=""></option> 
                </select>
                <br/><br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default VideoUploadPage
