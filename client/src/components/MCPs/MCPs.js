import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMCPs } from "../../actions/mcpsAction";
import GoogleMapReact from 'google-map-react';

import MCP from './MCP/MCP.js'
import MCPForm from './Form/MCPForm'
import MCPIcon from './MCP/MCPIcon';


const MCPs = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMCPs());
	}, []);

	const {mcps} = useSelector((state) => state.mcps);
	
	const defaultProps = {
		center: {
			lat: 10.882050,
			lng: 106.804708
		},
		zoom: 16
	};

	return (
  	<>
		<div class="container">
			<div class="row">
				<div class="col">
				<h1>MCPs list</h1>
				{!mcps.length ? <div class="spinner-border" role="status"/> :
					<ul class="list-group">
						{mcps.map((mcp) => <MCP mcp={mcp} key={mcp._id}/>)}
					</ul>}
				</div>
				<div class="col">
					<MCPForm />
				</div>
			</div>
			<br/>
			<div class="row" style={{ height: '100vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyBogcbadurzvTdLzTfIKaafyaBdzB8ILzM" }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					onChildClick = {console.log("da")}
      			>
				{mcps.map((mcp) =>
				<MCPIcon
					lat={mcp.latitude.$numberDecimal}
					lng={mcp.longitude.$numberDecimal}
					mcp={mcp}
					key={mcp._id}
				/>)}
				
      			</GoogleMapReact>
			</div>
		</div>
		
		<br/>
		
  	</>
  	);
}

export default MCPs