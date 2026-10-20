/**
 * Calendar utilities for generating Google Calendar URLs and .ics file downloads
 */
import { eventConfig } from '../config/event'

export function getGoogleCalendarUrl(): string {
  // Convert ISO string '2026-11-20T19:30:00' to '20261120T193000'
  const formatUtc = (iso: string) => iso.replace(/[-:]/g, '')

  const start = formatUtc(eventConfig.calendar.startDateISO)
  const end = formatUtc(eventConfig.calendar.endDateISO)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventConfig.calendar.title,
    dates: `${start}/${end}`,
    details: `${eventConfig.calendar.description}\n\nInstagram: ${eventConfig.instagramUrl}\nMessenger: ${eventConfig.contact.messengerUrl}`,
    location: eventConfig.calendar.location
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcsFile(): void {
  const formatIcsDate = (iso: string) => iso.replace(/[-:]/g, '')

  const start = formatIcsDate(eventConfig.calendar.startDateISO)
  const end = formatIcsDate(eventConfig.calendar.endDateISO)

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lilok Bible Talk - MICC Central Region//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${eventConfig.calendar.title}`,
    `DESCRIPTION:${eventConfig.calendar.description.replace(/\n/g, '\\n')}\\n\\nInstagram: ${eventConfig.instagramUrl}`,
    `LOCATION:${eventConfig.calendar.location}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', 'lilok-bible-talk-invitation.ics')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
