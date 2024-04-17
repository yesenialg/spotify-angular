import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('input and output of values', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any). default;

    //Act
    const result: TrackModel[] = pipe.transform(data)

    //Assert
    expect(result).toEqual(data);
  });
  
  it('is sorted correctly asc', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any). default;
    const firstExpect = data.find((i: any) => i._id === 7);
    const lastExpect = data.find((i: any) => i._id === 6);

    //Act
    const result: TrackModel[] = pipe.transform(data, 'name', 'asc')
    const firstResult = result[0];
    const lastResult = result[result.length -1];

    //Assert
    expect(firstResult).toEqual(firstExpect);
    expect(lastResult).toEqual(lastExpect);
  });

  it('is sorted correctly desc', () => {
    //Arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any). default;
    const lastExpect = data.find((i: any) => i._id === 7);
    const firstExpect = data.find((i: any) => i._id === 6);

    //Act
    const result: TrackModel[] = pipe.transform(data, 'name', 'desc')
    const firstResult = result[0];
    const lastResult = result[result.length -1];

    //Assert
    expect(firstResult).toEqual(firstExpect);
    expect(lastResult).toEqual(lastExpect);
  });
});
