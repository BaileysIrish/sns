import React, { useState, useEffect, useCallback } from 'react';
import { getSchedulesByUser } from '../api/userApi';

function TodaySchedule() {
    const [todaySchedules, setTodaySchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userEmail = localStorage.getItem('userEmail');

    const fetchTodaySchedules = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getSchedulesByUser(userEmail);

            const today = new Date().toLocaleDateString(); // 오늘 날짜 문자열 (로컬 포맷)
            const filteredSchedules = data.filter(schedule => {
                const scheduleDate = new Date(schedule.createdAt).toLocaleDateString();
                return scheduleDate === today; // 오늘 날짜와 일치하는 일정만 필터링
            });

            setTodaySchedules(filteredSchedules);
        } catch (error) {
            alert("오늘 일정 조회 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [userEmail]);

    useEffect(() => {
        fetchTodaySchedules();
    }, [fetchTodaySchedules]);

    return (
        <div>
            <h3>오늘 일정</h3>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : todaySchedules.length === 0 ? (
                <p>오늘 일정이 없습니다.</p>
            ) : (
                <ul>
                    {todaySchedules.map(schedule => (
                        <li key={schedule.id}>
                            <strong>{schedule.title}</strong>: {schedule.description}
                            <p>작성일: {new Date(schedule.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodaySchedule;
