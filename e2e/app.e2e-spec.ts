import { AngularNodePage } from './app.po';

describe('angular-node App', function() {
  let page: AngularNodePage;

  beforeEach(() => {
    page = new AngularNodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
