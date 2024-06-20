import { TimelineRow } from '../interface/action';
import { TimelineEffect } from '../interface/effect';
import { Emitter } from './emitter';
import { EventTypes } from './events';
export interface ITimelineEngine extends Emitter<EventTypes> {
    readonly isPlaying: boolean;
    readonly isPaused: boolean;
    effects: Record<string, TimelineEffect>;
    data: TimelineRow[];
    /** 设置播放速率 */
    setPlayRate(rate: number): boolean;
    /** 获取播放速率 */
    getPlayRate(): number;
    /** 重新渲染当前时间 */
    reRender(): void;
    /** 设置播放时间 */
    setTime(time: number, isTick?: boolean): boolean;
    /** 获取播放时间 */
    getTime(): number;
    /** 播放 */
    play(param: {
        /** 默认从头运行到尾, 优先级大于autoEnd */
        toTime?: number;
        /** 是否播放完后自动结束 */
        autoEnd?: boolean;
    }): boolean;
    /** 暂停 */
    pause(): void;
}
/**
 * 时间轴播放器
 * 可脱离编辑器单独运行
 * @export
 * @class TimelineEngine
 * @extends {Emitter<EventTypes>}
 */
export declare class TimelineEngine extends Emitter<EventTypes> implements ITimelineEngine {
    constructor();
    /** requestAnimationFrame timerId */
    private _timerId;
    /** 播放速率 */
    private _playRate;
    /** 当前时间 */
    private _currentTime;
    /** 播放状态 */
    private _playState;
    /** 时间帧pre数据 */
    private _prev;
    /** 动作效果map */
    private _effectMap;
    /** 需要运行的动作map */
    private _actionMap;
    /** 按动作开始时间正序排列后的动作id数组 */
    private _actionSortIds;
    /** 当前遍历到的action index */
    private _next;
    /** 动作时间范围包含当前时间的actionId列表 */
    private _activeActionIds;
    /** 是否正在播放 */
    get isPlaying(): boolean;
    /** 是否暂停中 */
    get isPaused(): boolean;
    set effects(effects: Record<string, TimelineEffect>);
    set data(data: TimelineRow[]);
    /**
     * 设置播放速率
     * @memberof TimelineEngine
     */
    setPlayRate(rate: number): boolean;
    /**
     * 获取播放速率
     * @memberof TimelineEngine
     */
    getPlayRate(): number;
    /**
     * 重新渲染当前时间
     * @return {*}
     * @memberof TimelineEngine
     */
    reRender(): void;
    /**
     * 设置播放时间
     * @param {number} time
     * @param {boolean} [isTick] 是否是tick触发
     * @memberof TimelineEngine
     */
    setTime(time: number, isTick?: boolean): boolean;
    /**
     * 获取当前时间
     * @return {*}  {number}
     * @memberof TimelineEngine
     */
    getTime(): number;
    /**
     * 运行: 开始时间为当前time
     * @param param
     * @return {boolean} {boolean}
     */
    play(param: {
        /** 默认从头运行到尾, 优先级大于autoEnd */
        toTime?: number;
        /** 是否播放完后自动结束 */
        autoEnd?: boolean;
    }): boolean;
    /**
     * 暂停播放
     * @memberof TimelineEngine
     */
    pause(): void;
    /** 播放完成 */
    private _end;
    private _startOrStop;
    /** 每帧执行 */
    private _tick;
    /** tick运行actions */
    private _tickAction;
    /** 重置active数据 */
    private _dealClear;
    /** 处理action time enter */
    private _dealEnter;
    /** 处理action time leave */
    private _dealLeave;
    /** 处理数据 */
    private _dealData;
}
