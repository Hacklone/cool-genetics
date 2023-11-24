import { ICandidateKnownCandidateTestState } from './candidate-test.interface';

export type CandidateId = string & { __CandidateId: string; };

export interface ICandidate {
  id: CandidateId;

  getNextMoveAsync(knownTestState: ICandidateKnownCandidateTestState): Promise<ICandidateMove>;
}

export interface ICandidateMove {

}

export interface ICandidateFactory {
  createRandomCandidateAsync(): Promise<ICandidate>;

  createCloneCandidateAsync(originalCandidate: Readonly<ICandidate>): Promise<ICandidate>;

  createCrossOverCandidateAsync(candidate1: Readonly<ICandidate>, candidate2: Readonly<ICandidate>): Promise<ICandidate>;

  createMutatedCandidateAsync(originalCandidate: Readonly<ICandidate>): Promise<ICandidate>;
}