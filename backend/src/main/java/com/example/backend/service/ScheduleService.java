package com.example.backend.service;

import com.example.backend.dto.ScheduleDTO;
import com.example.backend.model.Schedule;
import com.example.backend.model.User;
import com.example.backend.repository.ScheduleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    public ScheduleDTO saveSchedule(ScheduleDTO scheduleDTO) {
        User user = userRepository.findById(scheduleDTO.getUserEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Schedule schedule = new Schedule();
        schedule.setTitle(scheduleDTO.getTitle());
        schedule.setDescription(scheduleDTO.getDescription());
        schedule.setUser(user);

        Schedule savedSchedule = scheduleRepository.save(schedule);

        return mapToDTO(savedSchedule);
    }

    public List<ScheduleDTO> getSchedulesByUser(String email) {
        return scheduleRepository.findByUser_Email(email).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ScheduleDTO updateSchedule(Long id, ScheduleDTO scheduleDTO) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정이 존재하지 않습니다."));

        schedule.setTitle(scheduleDTO.getTitle());
        schedule.setDescription(scheduleDTO.getDescription());
        schedule.setUpdatedAt(LocalDateTime.now());

        Schedule updatedSchedule = scheduleRepository.save(schedule);
        return mapToDTO(updatedSchedule);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    private ScheduleDTO mapToDTO(Schedule schedule) {
        ScheduleDTO dto = new ScheduleDTO();
        dto.setId(schedule.getId());
        dto.setTitle(schedule.getTitle());
        dto.setDescription(schedule.getDescription());
        dto.setUserEmail(schedule.getUser().getEmail());
        dto.setCreatedAt(schedule.getCreatedAt());
        dto.setUpdatedAt(schedule.getUpdatedAt());
        return dto;
    }
}
