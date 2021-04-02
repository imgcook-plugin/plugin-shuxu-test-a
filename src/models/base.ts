type panelType = {
  panelName: string;
  panelType: string;
  panelValue: string;
}

type imgCookOptions = {
  data: {
    code: {
      panelDisplay: panelType[],
      style: string,
      xml: string
    }
  }
}