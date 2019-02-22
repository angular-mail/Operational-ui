import {Injectable} from '@angular/core';

import {HttpRequest} from '@angular/common/http';
import {MockReponse} from '../helpers/mock-response';
import {mockResponseList} from '../helpers/mock-response-list';

@Injectable({providedIn: 'root'})
export class MockService {
    private mockResponses: MockReponse[] = [...mockResponseList];

    findMockToIntercept(req: HttpRequest<any>): MockReponse {
        return this.mockResponses.find(mockResp => mockResp.checkRequest(req));
    }
}
