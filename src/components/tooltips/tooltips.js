function toolTIP() {
  tippy('[title]', {
    delay: 0,
    arrow: true,
    arrowType: 'round',
    duration: 250,
    animation: 'shift-away',
    placement: 'top',
    size: 'small',
    sticky: false,
    theme: 'dark lite',
    maxWidth: '250px'
  });
}

toolTIP();