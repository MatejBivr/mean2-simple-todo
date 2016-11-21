import { CleintPage } from './app.po';

describe('cleint App', function() {
  let page: CleintPage;

  beforeEach(() => {
    page = new CleintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
