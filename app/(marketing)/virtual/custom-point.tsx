import React, { useState } from 'react';

const CustomMarkerButton = ({ position, viewerPosition, zoomLevel, viewerSize }) => {
    const [isHovered, setIsHovered] = useState(false);

    const fmt = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 4 });

    const tooltipClass = `tooltip ${isHovered ? 'hovered' : 'hiding'} ${
        position.y < viewerSize.height / 3 ? 'bottom' : ''
    }`;

    return (
        <div 
            className="custom-marker-element"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button>
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="25" fill="currentColor" />
                    <circle cx="50" cy="50" r="40" strokeWidth="10" fill="none" stroke="currentColor" />
                </svg>
            </button>

            <div className={tooltipClass}>
                <div>
                    <h2>Params</h2>
                    <pre>
                        position: {position.x}px x {position.y}px{'\n'}
                        viewerPosition: {fmt.format(viewerPosition.yaw)}rad / {fmt.format(viewerPosition.pitch)}rad{'\n'}
                        zoomLevel: {zoomLevel}%{'\n'}
                        viewerSize: {viewerSize.width}px x {viewerSize.height}px
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CustomMarkerButton;
