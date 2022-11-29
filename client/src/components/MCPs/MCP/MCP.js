import React from 'react'

function MCP({mcp}) {
  	return (
    	<li class="list-group-item">
        	Tên: {mcp.name}  Lat: {mcp.latitude.$numberDecimal}  lng: {mcp.longitude.$numberDecimal}
    	</li>
  )
}

export default MCP