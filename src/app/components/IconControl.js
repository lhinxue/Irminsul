import { IconButton, Tooltip } from "@mui/material";

export default function IconControl(props) {
    const icon = props.icon
    const onClick = props.onClick
    const on = props.on
    const rotate = props.rotate
    const size = props.size ?? 30
    const grey = props.grey
    const tooltip = props.tooltip
    const tooltipPosition = props.tooltipPosition ?? 'top'

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        margin: '0 1px',
        padding: 0,
        transform: `rotate(${rotate ? on ? -90 : 0 : 0}deg)`,
        transition: 'all .3s ease',
        '& svg': {
            width: `${size * 0.66}px`,
            height: `${size * 0.66}px`,
            minWidth: `${size * 0.66}px`,
            minHeight: `${size * 0.66}px`,
        }
    }

    return (

        <>
            {
                tooltip ?
                    <Tooltip title={tooltip} placement={tooltipPosition}>
                        <IconButton
                            color={grey ? 'default' : on === true ? 'secondary' : on === false ? 'primary' : 'primary'}
                            onClick={onClick}
                            sx={style}
                        >
                            {icon}
                        </IconButton>
                    </Tooltip>
                    :
                    <IconButton
                        color={grey ? 'default' : on === true ? 'secondary' : on === false ? 'primary' : 'primary'}
                        onClick={onClick}
                        sx={style}
                    >
                        {icon}
                    </IconButton>
            }
        </>


    )
}