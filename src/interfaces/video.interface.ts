interface Duration {
    hour: number;
    minute: number;
    second: number;
  }
  
export interface Video {
    id: string;
    duration: Duration;
}