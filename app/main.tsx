import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Button } from '@progress/kendo-react-buttons';
import { arrowsMoveIcon } from '@progress/kendo-svg-icons';
import {
  useDraggable,
  Icon,
  SvgIcon,
  Typography,
  NormalizedDragEvent
} from '@progress/kendo-react-common';

const App = () => {
    const [position, setPosition] = React.useState({ x: 50, y: 50 });
    const [pressed, setPressed] = React.useState<boolean>(false);
    const [dragged, setDragged] = React.useState<boolean>(false);
    const [initial, setInitial] = React.useState<{x: number, y: number} | null>(null);
    const button = React.useRef<Button | null>(null);

    const handlePress = React.useCallback(
        () => {
            setPressed(true)
        },
        []
    )

    const handleDragStart = React.useCallback(
        (event: NormalizedDragEvent) => {
            setDragged(true);
            setInitial({
                x: event.clientX - position.x,
                y: event.clientY - position.y
            });
        },
        [position.x, position.y]
    )

    const handleDrag = React.useCallback(
        (event: NormalizedDragEvent) => {
            if(!initial) { return; }

            setPosition({
                x: event.clientX - initial.x,
                y: event.clientY - initial.y
            })
        },
        [initial]
    )

    const handleDragEnd = React.useCallback(
        () => {
            setDragged(false);
            setInitial(null);
        },
        []
    )

    const handleRelease = React.useCallback(
        () => {
            setPressed(false);
        },
        []
    )

    useDraggable(button, {
        onPress: handlePress,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        onRelease: handleRelease
    })

    return (
      <React.Fragment>
        <Typography.p fontSize={'large'} textAlign={'center'}>
          Draggable KendoReact Button
        </Typography.p>
        <Button
          ref={button}
          style={{
              position: 'absolute',
              left: position.x,
              top: position.y
            }}
          fillMode={pressed ? 'outline' : 'flat'}
          themeColor={dragged ? 'primary' : undefined}
          >
          <Icon name="move" size="medium" />
          Drag Me!
          <SvgIcon icon={arrowsMoveIcon} size="medium" />
        </Button>
      </React.Fragment>
      );
  };

  ReactDOM.render(<App />, document.querySelector("my-app"));
