import { RequestLog } from "../../models/RequestLogModel";
import { supabase } from "../../util/supabase.util";
import { IRequestLogRepository } from "./RequestLog.repository";

export class RequestLogRepository implements IRequestLogRepository<RequestLog> {

    public async find(id: string): Promise<RequestLog | null> {
        const { data, error } = await supabase
            .from('request_logs')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            console.error('Error in finding the log', error);
            return null;
        }
        if (data) {
            return {
                ...data,
                timestamp: data.created_at
            };
        }
        return null;
    }
    
    public async save(log: RequestLog): Promise<RequestLog | null> {
        const { data, error } = await supabase
            .from('request_logs')
            .insert([log])
            .select()
            .single();

        if (error) {
            console.error('Error inserting log: ', error);
            return null;
        }

        return data;
    }

    public async list(): Promise<Array<RequestLog>> {
        const { data, error } = await supabase
        .from('request_logs')
        .select("*")

    if (error) {
        console.error('Error inserting log: ', error);
        return [];
    }

    if (data) {
        return data.map((log) => ({
            ...log,
            timestamp: log.created_at
        }));
    }

    return [];

    }

}