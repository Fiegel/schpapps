export class Place {
  constructor(public id: number,
    public town?: string,
    public areaCode?: string,
    public county?: string,
    public region?: string,
    public country?: string,
    public subdivision?: string) { }
}
