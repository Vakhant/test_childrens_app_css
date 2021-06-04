import React from "react";

interface Props {
    onClick: () => void
}

export class StartNewTaskButton extends React.Component<Props> {
    render() {
        return (
                <svg onClick={this.props.onClick} className='header_btn' xmlns="http://www.w3.org/2000/svg" width="22.412" height="18.824" viewBox="0 0 22.412 18.824">
                <g id="Сгруппировать_5" data-name="Сгруппировать 5" transform="translate(-781.088 -594.088)">
                    <line id="Линия_6" data-name="Линия 6" x1="20" transform="translate(782.5 603.5)" fill="none" stroke="#758eb1" strokeLinecap="round" strokeWidth="2"/>
                    <line id="Линия_7" data-name="Линия 7" y1="8" x2="9" transform="translate(782.5 595.5)" fill="none" stroke="#758eb1" strokeLinecap="round" strokeWidth="2"/>
                    <line id="Линия_8" data-name="Линия 8" x2="9" y2="8" transform="translate(782.5 603.5)" fill="none" stroke="#758eb1" strokeLinecap="round" strokeWidth="2"/>
                </g>
                </svg>
        )
    }
}
