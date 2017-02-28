import { ChatappWebClientPage } from './app.po';

describe('chatapp-web-client App', function() {
  let page: ChatappWebClientPage;

  beforeEach(() => {
    page = new ChatappWebClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
