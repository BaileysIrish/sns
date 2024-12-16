import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getSchedulesByUser, createSchedule, deleteSchedule, updateSchedule } from '../api/userApi';

function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState({ title: '', description: '' });
    const [editingSchedule, setEditingSchedule] = useState(null); // 수정 중인 일정
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const userEmail = localStorage.getItem('userEmail');

    const fetchSchedules = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getSchedulesByUser(userEmail);
            const filteredSchedules = data.filter(schedule => {
                const scheduleDate = new Date(schedule.createdAt);
                return (
                    scheduleDate.getFullYear() === selectedDate.getFullYear() &&
                    scheduleDate.getMonth() === selectedDate.getMonth() &&
                    scheduleDate.getDate() === selectedDate.getDate()
                );
            });
            setSchedules(filteredSchedules);
        } catch (error) {
            alert("일정 조회 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [userEmail, selectedDate]);

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAddOrUpdateSchedule = async () => {
        if (!newSchedule.title || !newSchedule.description) {
            alert("제목과 설명을 입력해주세요.");
            return;
        }
        setIsLoading(true);
        try {
            if (editingSchedule) {
                // 수정 모드
                await updateSchedule(editingSchedule.id, {
                    ...newSchedule,
                    userEmail,
                });
            } else {
                // 추가 모드
                await createSchedule({
                    ...newSchedule,
                    userEmail,
                });
            }
            setNewSchedule({ title: '', description: '' });
            setEditingSchedule(null);
            fetchSchedules();
        } catch (error) {
            alert("일정 처리 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditSchedule = (schedule) => {
        setNewSchedule({ title: schedule.title, description: schedule.description });
        setEditingSchedule(schedule);
    };

    const handleDeleteSchedule = async (id) => {
        setIsLoading(true);
        try {
            await deleteSchedule(id);
            fetchSchedules();
        } catch (error) {
            alert("일정 삭제 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>캘린더</h2>
            <Calendar onChange={handleDateChange} value={selectedDate} />

            <h3>{selectedDate.toDateString()} 일정</h3>
            {isLoading ? (
                <p>로딩 중...</p>
            ) : schedules.length === 0 ? (
                <p>해당 날짜에 일정이 없습니다.</p>
            ) : (
                <ul>
                    {schedules.map(schedule => (
                        <li key={schedule.id}>
                            <strong>{schedule.title}</strong>: {schedule.description}
                            <p>
                                작성: {new Date(schedule.createdAt).toLocaleDateString()}
                                수정: {new Date(schedule.updatedAt).toLocaleDateString()}
                            </p>
                            <button onClick={() => handleEditSchedule(schedule)}>수정</button>
                            <button onClick={() => handleDeleteSchedule(schedule.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>{editingSchedule ? "일정 수정" : "새 일정 추가"}</h3>
            <input
                type="text"
                placeholder="제목"
                value={newSchedule.title}
                onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
            />
            <textarea
                placeholder="설명"
                value={newSchedule.description}
                onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
            ></textarea>
            <button onClick={handleAddOrUpdateSchedule} disabled={isLoading}>
                {editingSchedule ? "수정" : "추가"}
            </button>
        </div>
    );
}

export default CalendarPage;
